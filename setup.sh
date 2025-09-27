#!/bin/bash
echo "Setting up To-Do List Application..."
echo

echo "Installing dependencies..."
npm run install:all

echo
echo "Setting up environment file..."
cp backend/.env.example backend/.env

echo
echo "Setup complete!"
echo
echo "To start the application, run: npm run dev"
echo
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:4000"
echo
