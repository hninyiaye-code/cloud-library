# This block tells Terraform which provider we want to use.
# A provider lets Terraform communicate with a platform such as AWS.

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

# This block configures the AWS provider.
# The region where Terraform will create resources.

provider "aws" {
  region = "us-east-1"
}

# Create an Amazon S3 bucket for the Cloud Library project.
# Create S3 bucket names must be globally unique.
# Tags help identify and organize AWS resources.

resource "aws_s3_bucket" "cloud_library" {
  bucket = "cloud-library-terraform-hninyi-2026"

  tags = {
    Name        = "Cloud Library Terraform"
    Environment = "Portfolio"
  }
}

# Block all public access to the S3 bucket that is already created.
# CloudFront will access the bucket later instead of the public internet.

resource "aws_s3_bucket_public_access_block" "cloud_library" {
  bucket = aws_s3_bucket.cloud_library.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

# Set S3 object ownership.
# BucketOwnerEnforced disables ACLs and keeps ownership with this AWS account.

resource "aws_s3_bucket_ownership_controls" "cloud_library" {
  bucket = aws_s3_bucket.cloud_library.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# Enable versioning for the S3 bucket.
# This helps protect files by keeping previous versions.

resource "aws_s3_bucket_versioning" "cloud_library" {
  bucket = aws_s3_bucket.cloud_library.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Create CloudFront Origin Access Control (OAC).
# OAC allows CloudFront to securely access the private S3 bucket.
resource "aws_cloudfront_origin_access_control" "cloud_library" {
  name                              = "cloud-library-oac"
  description                       = "OAC for Cloud Library S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Create a CloudFront distribution for the Cloud Library website.
resource "aws_cloudfront_distribution" "cloud_library" {

  #S3 will be the origin where CloudFront gets the website files.
  origin {
    domain_name              = aws_s3_bucket.cloud_library.bucket_regional_domain_name
    origin_id                = "cloud-library-s3-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.cloud_library.id
  }

  # Turn on the CloudFront distribution.
  enabled = true

  # When users visit the main CloudFront URL,
  # CloudFront will automatically request index.html.
  default_root_object = "index.html"

  # Controls how CloudFront handles requests from users.
  default_cache_behavior {
    target_origin_id = "cloud-library-s3-origin"

    #Our static website only needs GET and HEAD requests.
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    # Redirect HTTP visitors to HTTPS.
    viewer_protocol_policy = "redirect-to-https"

    #Enable compression for faster delivery.
    compress = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }

    }
  }

  # No geographic restrictions.
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Use the default CloudFront HTTPS certificate.
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name        = "Cloud Library CloudFront"
    Environment = "Portfolio"
  }
}

# Allow CloudFront to read objects from the private S3 bucket.
resource "aws_s3_bucket_policy" "cloud_library" {
  bucket = aws_s3_bucket.cloud_library.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        "Sid" : "AllowCloudFrontServicePrincipal",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "cloudfront.amazonaws.com"
        }

        Action   = "S3:GetObject"
        Resource = "arn:aws:s3:::cloud-library-terraform-hninyi-2026/*"

        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cloud_library.arn
          }
        }
      }
    ]

  })
}
# Show me the domain name AWS assigned to my CloudFront distribution.
output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.cloud_library.domain_name
}
