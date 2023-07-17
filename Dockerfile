# Use a base image with Node.js pre-installed
FROM node:18-alpine
# Set the working directory inside the container
WORKDIR /app
# Copy the entire project to the working directory
COPY . .
RUN npm install
# Build the Next.js project
RUN npm run build
# Expose the port that the Next.js application will run on
EXPOSE 3000
# Start the Next.js application
CMD ["npm", "start"]


#build the image
#docker build -t nextts-template .

#run the image
#docker run -d -p 8080:3000 nextts-template