import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

import { generateClient } from "aws-amplify/data";
import { uploadData, getUrl, remove } from "aws-amplify/storage";

// Configure Amplify with generated backend outputs
Amplify.configure(outputs);

// Generate Data client from Amplify Data schema
const client = generateClient();

export default function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ content: "", image: null });
  const [loading, setLoading] = useState(false);

  // Fetch notes from Amplify Data
  async function fetchNotes() {
    try {
      const { data } = await client.models.Note.list();
      const items = await Promise.all(
        data.map(async (note) => {
          if (note.image) {
            const url = await getUrl({ path: note.image });
            note.imageUrl = url.url;
          }
          return note;
        })
      );
      setNotes(items);
    } catch (err) {
      console.error("❌ Error fetching notes:", err);
    }
  }

  // Create a new note (with optional image upload)
  async function createNote(e) {
    e.preventDefault();
    if (!formData.content) return;

    setLoading(true);
    try {
      let imagePath = null;

      // If user selected an image, upload it to Storage
      if (formData.image) {
        const filename = `${Date.now()}-${formData.image.name}`;
        const uploadResult = await uploadData({
          path: filename,
          data: formData.image,
        }).result;
        imagePath = uploadResult.path;
      }

      // Save the new note to the Data model
      await client.models.Note.create({
        content: formData.content,
        image: imagePath,
      });

      // Refresh list
      await fetchNotes();

      // Reset form
      setFormData({ content: "", image: null });
    } catch (err) {
      console.error("❌ Error creating note:", err);
    } finally {
      setLoading(false);
    }
  }

  // Delete a note
  async function deleteNote(id) {
    try {
      const noteToDelete = notes.find((n) => n.id === id);

      // If the note has an image, remove it from Storage
      if (noteToDelete.image) {
        await remove({ path: noteToDelete.image });
      }

      await client.models.Note.delete({ id });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("❌ Error deleting note:", err);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={styles.container}>
          <h1 style={styles.heading}>Notes App</h1>
          <p>Welcome, {user?.username}</p>

          {/* New Note Form */}
          <form onSubmit={createNote} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Write your note..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
            <input
              type="file"
              style={styles.fileInput}
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Saving..." : "Add Note"}
            </button>
          </form>

          {/* Notes List */}
          <div style={styles.noteList}>
            {notes.map((note) => (
              <div key={note.id} style={styles.noteCard}>
                <p>{note.content}</p>
                {note.imageUrl && (
                  <img
                    src={note.imageUrl}
                    alt="note"
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                )}
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button onClick={signOut} style={styles.signOut}>
            Sign Out
          </button>
        </main>
      )}
    </Authenticator>
  );
}

// 💅 Simple inline styles
const styles = {
  container: { maxWidth: 600, margin: "2rem auto", textAlign: "center" },
  heading: { fontSize: 28, marginBottom: 20 },
  form: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  input: { padding: 10, fontSize: 16 },
  fileInput: { padding: 10 },
  button: { padding: 10, background: "#007bff", color: "#fff", border: "none" },
  noteList: { display: "grid", gap: 15 },
  noteCard: {
    background: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    textAlign: "left",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    padding: "6px 12px",
    border: "none",
    marginTop: 10,
  },
  signOut: {
    marginTop: 30,
    background: "#333",
    color: "white",
    padding: "10px 20px",
    border: "none",
  },
};
