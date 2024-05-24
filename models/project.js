// models/project.js

import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  ProjectTitle: {
    type: String,
    required: true
  },
  ProjectContent: {
    type: String,
    required: true
  },
  ProjectDeadline: {
    type: String,
    required: true
  },
  ProjectCamera: {
    type: String,
    required: true
  },
  ProjectAmount: {
    type: String,
    required: true
  },
  ProjectUrl: {
    type: String,
    required: true
  },
  ProjectStatus: {
    type: String,
    required: true
  },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
