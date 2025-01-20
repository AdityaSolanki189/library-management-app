import requests
import random
from faker import Faker
import time
from datetime import datetime

# Initialize Faker for generating realistic data
fake = Faker()

# Constants
API_URL = "http://localhost:4000/api/book/create"
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWZkY2E0NS1lMWJhLTRlMmItOWNkNS02OGUxMDJhMjBiODMiLCJpYXQiOjE3MzczNjgzNDEsImV4cCI6MTczNzM2ODk0MX0.i8kGOUT9oFBBcC6HvJXGByM4amFOxosMZ-1wVcATTDg"  # Replace with your actual auth token
HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json"
}

# List of common book genres
GENRES = ["Fiction", "Mystery", "Science Fiction", "Fantasy", "Romance", "Thriller", 
          "Horror", "Biography", "History", "Science"]

# List of possible cover colors (hex codes)
COVER_COLORS = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#000000"]

def generate_book_data():
    """Generate random book data that matches the schema requirements"""
    total_copies = random.randint(1, 100)
    return {
        "title": fake.catch_phrase()[:100],  # Ensuring max length of 100
        "description": fake.text()[:1000],    # Ensuring max length of 1000
        "author": fake.name(),
        "genre": random.choice(GENRES),
        "rating": random.randint(1, 10),
        "coverUrl": fake.image_url(),
        "videoUrl": fake.url(),
        "coverColor": random.choice(COVER_COLORS),
        "totalCopies": total_copies,
        "availableCopies": random.randint(0, total_copies),  # Ensuring available copies ≤ total copies
        "summary": fake.paragraph()[:1000]     # Ensuring max length of 1000
    }

def create_books(num_books=5):
    """Make POST requests to create specified number of books"""
    successful_requests = 0
    failed_requests = 0
    request_times = []
    
    start_time = time.time()
    
    for i in range(num_books):
        try:
            book_data = generate_book_data()
            
            # Time the individual request
            request_start = time.time()
            response = requests.post(API_URL, json=book_data, headers=HEADERS)
            request_time = time.time() - request_start
            request_times.append(request_time)
            
            if response.status_code == 200 or response.status_code == 201:
                successful_requests += 1
                print(f"Book {i+1}/{num_books} created successfully in {request_time:.2f} seconds")
            else:
                failed_requests += 1
                print(f"Failed to create book {i+1}/{num_books}. Status code: {response.status_code}")
                print(f"Response: {response.text}")
            
            # Add a small delay between requests to prevent overwhelming the server
            time.sleep(0.5)
            
        except Exception as e:
            failed_requests += 1
            print(f"Error creating book {i+1}/{num_books}: {str(e)}")
    
    total_time = time.time() - start_time
    
    # Calculate statistics
    avg_request_time = sum(request_times) / len(request_times) if request_times else 0
    max_request_time = max(request_times) if request_times else 0
    min_request_time = min(request_times) if request_times else 0
    
    print("\n=== Summary ===")
    print(f"Total execution time: {total_time:.2f} seconds")
    print(f"Average request time: {avg_request_time:.2f} seconds")
    print(f"Fastest request: {min_request_time:.2f} seconds")
    print(f"Slowest request: {max_request_time:.2f} seconds")
    print(f"Successful requests: {successful_requests}")
    print(f"Failed requests: {failed_requests}")

if __name__ == "__main__":
    print(f"Starting book creation at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    create_books()