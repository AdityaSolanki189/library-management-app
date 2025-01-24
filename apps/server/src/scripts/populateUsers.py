import requests
import random
import string
import time
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def generate_random_email():
    """Generates a random email for testing purposes."""
    username = ''.join(random.choices(string.ascii_lowercase, k=8))
    domain = "example.com"
    return f"{username}@{domain}"

def generate_random_name():
    """Generates a random name."""
    first_name = ''.join(random.choices(string.ascii_uppercase, k=1)) + ''.join(random.choices(string.ascii_lowercase, k=6))
    last_name = ''.join(random.choices(string.ascii_uppercase, k=1)) + ''.join(random.choices(string.ascii_lowercase, k=6))
    return f"{first_name} {last_name}"

def generate_unique_university_id(existing_ids):
    """Generates a unique university ID."""
    while True:
        university_id = random.randint(1000, 9999)
        if university_id not in existing_ids:
            existing_ids.add(university_id)
            return university_id

def generate_unique_university_card(existing_cards):
    """Generates a unique university card."""
    while True:
        university_card = "CARD" + ''.join(random.choices(string.digits, k=6))
        if university_card not in existing_cards:
            existing_cards.add(university_card)
            return university_card

def generate_request_body(existing_ids, existing_cards):
    """Generates a valid and unique request body based on the provided schema."""
    return {
        "fullName": generate_random_name(),
        "email": generate_random_email(),
        "universityId": generate_unique_university_id(existing_ids),
        "universityCard": generate_unique_university_card(existing_cards),
        "password": "password123"
    }

def post_requests(api_url, num_requests=50):
    """Makes POST requests to the given API route up to num_requests times."""
    success_count = 0
    failure_count = 0

    existing_ids = set()
    existing_cards = set()

    # Retrieve the authorization token from the .env file
    token = os.getenv("AUTH_TOKEN")
    if not token:
        print("Authorization token not found in .env file.")
        return

    headers = {
        "Authorization": f"Bearer {token}"
    }

    start_time = time.time()

    for i in range(num_requests):
        body = generate_request_body(existing_ids, existing_cards)
        try:
            response = requests.post(api_url, json=body, headers=headers)
            if response.status_code == 201:
                success_count += 1
            else:
                failure_count += 1
                print(f"Request {i+1} failed with status code {response.status_code}: {response.text}")
        except Exception as e:
            failure_count += 1
            print(f"Request {i+1} failed with exception: {e}")

    end_time = time.time()
    total_time = end_time - start_time

    print("\nSummary:")
    print(f"Total Requests: {num_requests}")
    print(f"Successful Requests: {success_count}")
    print(f"Failed Requests: {failure_count}")
    print(f"Total Time Taken: {total_time:.2f} seconds")

if __name__ == "__main__":
    API_URL = "http://localhost:4000/api/admin/add-user"  # Replace with your API endpoint
    post_requests(API_URL)
