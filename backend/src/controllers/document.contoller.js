const Document = require("./../models/employee.model"); // Path to your Document model

class DocumentController {
  // Create a new document
  async createDocument(req, res) {
    const newDocument = new Document(req.body);
    try {
      const savedDocument = await newDocument.save();
      res.status(201).json(savedDocument);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Retrieve all documents
  async getAllDocuments(req, res) {
    try {
      const documents = await Document.find();
      res.json(documents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Retrieve a single document by ID
  async getDocument(req, res) {
    try {
      const document = await Document.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a document
  async updateDocument(req, res) {
    try {
      const updatedDocument = await Document.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(updatedDocument);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Delete a document
  async deleteDocument(req, res) {
    try {
      const deletedDocument = await Document.findByIdAndDelete(req.params.id);
      if (!deletedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json({ message: "Document deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new DocumentController();
