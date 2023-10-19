# Use the official Node.js image as the base image
FROM node:18-alpine
WORKDIR /app
# Create a non-root user to run the application
RUN adduser -D docker
# Change the ownership of the working directory to the non-root user
RUN chown docker:docker /app
# Switch to the non-root user
USER docker
# Copy the entire project to the working directory
COPY . .
# Install dependencies
RUN npm install
# Build the Next.js project
RUN npm run build
# Start the application
CMD ["npm", "start"]

#build the image
#docker build -t nextts-template .

#run the image
#docker run --rm -d -p 3000:3000 nextts-template
