import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Pagetitle = ({ title }) => <h1 style={{ textAlign: 'center', color:'#fff' }}>{title}</h1>;

const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #444',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: '#222',
    color: '#fff',
};

const buttonStyle = {
    backgroundColor: ' #a855f7',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
};

const AddTool = () => {
    const { user } = useAuth() || {}; 

    const [toolData, setToolData] = useState({
        title: '',
        description: '',
        category: 'Tools',
        owner: user ? user.username : 'Current User',
        imageBase64: '' 
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'imageFile') {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                    setToolData(prev => ({ ...prev, imageBase64: reader.result }));
                };
                reader.readAsDataURL(file);
            } else {
                setPreview(null);
                setToolData(prev => ({ ...prev, imageBase64: '' }));
            }
        } else {
            setToolData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        try {
            const payload = {
                title: toolData.title,
                description: toolData.description,
                class: toolData.category, 
                owner: toolData.owner,
                imageURL: toolData.imageBase64,
                price: 0, 
                createdAt: new Date().toISOString()
            };

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to add tool');

            setSubmissionStatus('success');
            alert('Tool added successfully! Redirecting...');
            setTimeout(() => navigate('/product'), 1500);

        } catch (error) {
            console.error('Error submitting tool:', error);
            setSubmissionStatus('error');
            alert('Failed to add tool. Check console for details.');
        }
    };

    return (
        <main className="add-tool-page" style={{ padding: '20px', backgroundColor: '#111', minHeight: '80vh' }}>
            <Pagetitle title="List Your Tool for Exchange" />
            <div className="ct-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    
                    <div>
                        <label htmlFor="title" style={{ fontWeight: 'bold', color: '#fff' }}>Tool Name *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={toolData.title}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" style={{ fontWeight: 'bold', color: '#fff' }}>Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={toolData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="category" style={{ fontWeight: 'bold', color: '#fff' }}>Category</label>
                        <select
                            id="category"
                            name="category"
                            value={toolData.category}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="Tools">Tools</option>
                            <option value="architecture">Architecture</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="electrical">Electrical / Electronics</option>
                            <option value="Lab Kits">Lab Kits</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ fontWeight: 'bold', color: '#fff' }}>Upload Image</label>
                        <div 
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                padding: '10px', border: '1px dashed #888', borderRadius: '6px', 
                                backgroundColor: '#222', cursor: 'pointer'
                            }}
                            onClick={() => document.getElementById('imageFile').click()}
                        >
                            <span style={{ color:'#fff', marginBottom: '10px' }}>
                                {preview ? "Change Image" : "Click to browse image"}
                            </span>
                            {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px', borderRadius: '4px' }} />}
                        </div>
                        <input
                            type="file"
                            id="imageFile"
                            name="imageFile"
                            accept="image/*"
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <button type="submit" disabled={submissionStatus === 'loading'} style={buttonStyle}>
                        {submissionStatus === 'loading' ? 'Submitting...' : 'List Tool for Exchange'}
                    </button>

                    {submissionStatus === 'success' && <p style={{ color: 'lightgreen', textAlign: 'center' }}>Tool listed successfully!</p>}
                    {submissionStatus === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Submission failed. Please try again.</p>}
                </form>
            </div>
        </main>
    );
};

export default AddTool;