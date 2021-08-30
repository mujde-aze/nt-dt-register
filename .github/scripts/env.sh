#!/bin/bash

set -e

{
echo REACT_APP_API_KEY="$REACT_APP_API_KEY"
echo REACT_APP_AUTH_DOMAIN="$REACT_APP_AUTH_DOMAIN"
echo REACT_APP_PROJECT_ID="$REACT_APP_PROJECT_ID"
echo REACT_APP_STORAGE_BUCKET="$REACT_APP_STORAGE_BUCKET"
echo REACT_APP_MESSAGING_SENDER_ID="$REACT_APP_MESSAGING_SENDER_ID"
echo REACT_APP_APP_ID="$REACT_APP_APP_ID"
echo REACT_APP_MEASUREMENT_ID="$REACT_APP_MEASUREMENT_ID"
echo REACT_APP_APP_CHECK_PUBLIC_KEY="$REACT_APP_APP_CHECK_PUBLIC_KEY"
} >> .env
