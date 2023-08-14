#!/bin/bash

# Define the directory to search in
directory="./src/"


# Function to remove lines based on the pattern
remove_lines() {
  local pattern="$1"
  local num_lines="$2"

  # Use sed to remove the matching line and the next 'num_lines' lines
  sed -i "/$pattern/,+${num_lines}d" "$file"
}

files=$(grep -rl '#REMOVELINE' ./src)

# Loop through each file in the directory
for file in $files; do
  if [ -f "$file" ]; then
    # Check if the file contains the '#REMOVELINE' pattern
    while grep -q "#REMOVELINE\+" "$file"; do
      # Get the number from the matched line
      pattern_number=$(grep -oE '#REMOVELINE ([0-9]+)' "$file" | awk '{print $2}')
      if [ -n "$pattern_number" ]; then
        # If a number is found, remove the matching line and the next 'pattern_number' lines
        remove_lines "#REMOVELINE $pattern_number" "$pattern_number"
      else
        # If no number is found, remove only the line containing '#REMOVELINE'
        remove_lines "#REMOVELINE" 1
      fi
    done
  fi
done
