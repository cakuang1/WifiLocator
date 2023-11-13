# Use a specific tag for the OpenJDK base image
FROM openjdk:17-jdk-slim

# Setting up work directory
WORKDIR /app

# Copy the JAR file into our app
COPY ./target/mongoconnector-0.0.1-SNAPSHOT.jar /app

# Expose the port used by your application (adjust as needed)
EXPOSE 8080

# Starting the application
CMD ["java", "-jar", "mongoconnector-0.0.1-SNAPSHOT.jar"]
