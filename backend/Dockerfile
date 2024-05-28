# Use the official Node.js image
FROM node


# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 4200

# Command to run the application
CMD ["npm", "run-script" , "start-dev"]