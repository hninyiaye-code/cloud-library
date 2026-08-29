# Cloud Library Management System

## Overview
Cloud Library is a web-based library management project created with HTML, CSS and JavaScript.
The project allows users to browse and search books, view and search members, add members, manage borrowing information and view a simple dashboard.
The application is deployed on AWS using Amazon S3 and Amazon CloudFront. The S3 bucket stores the static website files and remains private, while CloudFront securely delivers the website to users.

## Features
- Responsive navigation
- Book catalog
- Book search
- Member management page
- Borrowing page
- Dashboard page
- Responsive design
- JavaScript interaction

## Technologies Used
- HTML 5
- CSS 3
- JavaScript
- Git
- GitHub
- Amazon S3
- Amazon CloudFront

## AWS Architecture Diagram

The Cloud Library application uses Amazon CloudFront to securely deliver static website content stored in private Amazon S3 bucket.

![Cloud Library AWS Architecture](architecture/cloud-library-aws-architecture.png)

## AWS Cloud Deployment

The Cloud Library website is deployed on AWS as a static web application.

## AWS Services

- **Amazon S3** - Stores the HTML, CSS, JavaScript and image files.
- **Amazon CloudFront** - Delivers the website securely through the AWS global edge network.
- **S3 Block Public Access** - Keeps the S3 bucket private.
- **CloudFront access to S3** - Allows CloudFront to retrieve website objects from the private S3 bucket.

## Architecture

User --> Amazon CloudFront --> Private Amazon S3 Bucket --> Website Files

### Deployment Highlights

- Uploaded the static website files to Amazon S3.
- Configured the S3 bucket with Block Public Access enabled.
- Configured a bucket policy allowing CloudFront to retrieve S3 objects.
- Created an Amazon CloudFront distribution.
- Configured `index.html` as the default root object.
- Successfully delivered the website through the CloudFront domain.

## AWS Deployment Screenshots
#### Live Website via Amazon CloudFront

![Cloud Library deployed through CloudFront](screenshots/04-cloudfront-live-website.png)

#### Website Files Stored in Amazon S3

![Cloud Library files in Amazon S3](screenshots/03-s3-project-objects.png)

#### Private S3 Bucket

![S3 Block Public Access](screenshots/05-s3-block-public-access.png)

#### Amazon CloudFront Distribution

![CloudFront distribution](screenshots/07-cloudfront-distribution.png)

## Project Pages
- `index.html` - Home page
- `books.html` - Book catalog
- `members.html` - Member management
- `borrow.html` - Borrowing page
- `dashboard.html` - Library dashboard

## Project Structure
```text
cloud_library/
|
|-- css/
|   |-- style.css
|
|-- images/
|
|-- js/
|   |-- script.js
|
|-- screenshots/
|   |-- 01-s3-bucket-created.png
    |-- 02-s3-upload-success.png
    |-- 03-s3-project-objects.png
    |-- 04-cloudfront-live-website.png
    |-- 05-s3-block-public-access.png
    |-- 06-s3-cloudfront-bucket-policy.png
    |-- 07-cloudfront-distribution.png
|
|-- architecture/
|   |-- cloud-library-aws-architecture.drawio
    |-- cloud--library-aws-architecture.png
|
|-- index.html
|-- books.html
|-- members.html
|-- borrow.html
|-- dashboard.html
|-- README.md
```

