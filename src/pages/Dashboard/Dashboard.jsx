import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Plus,
  Trash2,
  FileText,
  Loader,
  Users,
  AlertTriangle,
  Clipboard,
  Edit2, // Added icon for Edit
  X,     // Added icon for Cancel
  Check  // Added icon for Save
} from 'lucide-react';

// Use standard API URL
const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  // Assuming theme is managed via context or props (simplified here)
  const theme = 'light'; 
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [newDocName, setNewDocName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Update State (For renaming)
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // Helper to get headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // 1. Check Auth & Load Data on Mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Assuming you save user object on login

    if (!token) {
      navigate('/login');
      return;
    }

    if (storedUser) setUser(JSON.parse(storedUser));
    fetchDocuments();
  }, [navigate]);

  // 2. READ: Fetch Documents from API
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/documents`, {
        headers: getAuthHeaders()
      });
      
      if (!res.ok) throw new Error('Failed to fetch documents');
      
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. CREATE: Add Document via API
  const handleAddDoc = async () => {
    if (!newDocName.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/documents`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newDocName, type: 'PDF' })
      });

      if (!res.ok) throw new Error('Failed to create document');

      const newDoc = await res.json();
      // Add to state immediately
      setDocuments(prev => [newDoc, ...prev]);
      setNewDocName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. DELETE: Remove Document via API
  const handleDeleteDoc = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/documents/${docId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!res.ok) throw new Error('Failed to delete');

      setDocuments(prev => prev.filter(doc => doc._id !== docId));
    } catch (err) {
      setError("Could not delete document");
    } finally {
      setLoading(false);
    }
  };

  // 5. UPDATE: Rename Document via API
  const startEditing = (doc) => {
    setEditingId(doc._id);
    setEditName(doc.name);
  };

  const handleUpdateDoc = async (docId) => {
    if (!editName.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/documents/${docId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: editName })
      });

      if (!res.ok) throw new Error('Failed to update');

      // Update local state
      setDocuments(prev => prev.map(doc => 
        doc._id === docId ? { ...doc, name: editName } : doc
      ));
      setEditingId(null);
    } catch (err) {
      setError("Could not update document name");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- RENDER HELPERS ---
  const COLOR_LIGHT_BG = '#F9FAFB';
  const COLOR_TEXT_DARK = '#1E293B';

  return (
    <div className={`min-h-screen pt-12 pb-12 font-inter bg-[${COLOR_LIGHT_BG}] text-[${COLOR_TEXT_DARK}]`}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 p-6 rounded-2xl shadow-xl bg-white shadow-gray-300/50">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              👋 Welcome, {user?.name || 'User'}!
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users size={16} className="text-cyan-500" />
              <span>{user?.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-sm font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 transition">
            <LogOut size={16} /> <span>Sign Out</span>
          </button>
        </div>

        {/* ALERTS */}
        {loading && (
          <div className="flex items-center justify-center p-6 mb-8 rounded-xl bg-cyan-50">
            <Loader size={24} className="animate-spin mr-3 text-cyan-600" />
            <span className="font-medium text-cyan-800">Syncing with database...</span>
          </div>
        )}
        {error && (
          <div className="flex items-center p-4 mb-8 rounded-xl bg-red-50 text-red-600 border border-red-200">
            <AlertTriangle size={20} className="mr-3" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* INPUT SECTION */}
        <div className="mb-10 p-6 rounded-2xl shadow-xl bg-white shadow-gray-300/50">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload New Document</h2>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="text"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="Enter document name..."
              className="flex-grow p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAddDoc()}
            />
            <button
              onClick={handleAddDoc}
              disabled={!newDocName.trim() || loading}
              className="flex items-center justify-center px-6 py-3 font-bold text-white rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 shadow-lg disabled:opacity-50"
            >
              <Plus size={20} className="mr-2" /> Upload
            </button>
          </div>
        </div>

        {/* LIST SECTION */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Documents ({documents.length})</h2>
        
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc._id} className="flex flex-col sm:flex-row items-center p-4 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition">
              <FileText size={24} className="mr-4 text-cyan-500 shrink-0" />
              
              <div className="flex-grow my-2 sm:my-0 w-full">
                {editingId === doc._id ? (
                  // EDIT MODE INPUT
                  <div className="flex items-center space-x-2">
                    <input 
                      className="border p-1 rounded w-full sm:w-1/2" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <button onClick={() => handleUpdateDoc(doc._id)} className="text-green-600"><Check size={20}/></button>
                    <button onClick={() => setEditingId(null)} className="text-red-500"><X size={20}/></button>
                  </div>
                ) : (
                  // VIEW MODE
                  <>
                    <h3 className="text-lg font-medium text-gray-800">{doc.name}</h3>
                    <p className="text-sm text-gray-500">
                      {doc.type} • {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center space-x-2 mt-3 sm:mt-0 sm:ml-auto">
                {editingId !== doc._id && (
                  <>
                    <button onClick={() => startEditing(doc)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Rename">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDeleteDoc(doc._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {documents.length === 0 && !loading && (
             <p className="text-center text-gray-500 mt-10">No documents found. Start by adding one!</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;