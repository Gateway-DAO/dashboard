#!/bin/bash
# Description: Generates the .env file for the project

function print_help {
    echo "Usage: ./scripts/generate-env.sh [-d | -s] <stage>"
    echo "Arguments:"
    echo "  stage - the stage to generate the .env file for"
    echo "  -d    - diff the .env.<stage> file with whats on SSM"
    echo "  -s    - update the .env.<stage> file on SSM"
}

# Script Arguments
# ----------------
PROJECT="dashboad-next"
REQUIRED_CLI=(
    aws
    jq
)

main() {
    local PARAM1=$1
    local PARAM2=$2

    validate_arguments $PARAM1 $PARAM2
    validate_libraries

    # If -d flag is passed, diff the .env.dev file with whats on SSM
    if test $PARAM1 = '-d'; then
        diff_env $PARAM2
    elif test $PARAM1 = '-s'; then
        # Ask for confirmation
        echo -e "⚠️ WARNING: DIFF the .env.${PARAM2} file with whats on SSM before updating SSM"
        echo -e "   -> run: pnpm env:diff:${PARAM2}"
        echo ""
        read -p "UPDATE SSM with .env.${PARAM2} file? (y/n) " -n 1 -r
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            put_env $PARAM2
        fi
    else
        # Ask for confirmation
        read -p "OVERRIDE project .env.${PARAM1} file from SSM? (y/n) " -n 1 -r
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            generate_env $PARAM1
        fi
    fi

    exit 0
}

# Helper Functions
# ----------------
function generate_env {
    local STAGE=$1
    echo -e "\nGenerating .env.${STAGE} file"
    aws ssm get-parameter --name "/${PROJECT}/${STAGE}" --with-decryption | jq -r '.Parameter.Value' >.env.${STAGE} || exit 1
}

function diff_env {
    local STAGE=$1
    local SSM=$(aws ssm get-parameter --name "/${PROJECT}/${STAGE}" --with-decryption --output json | jq '.Parameter.Value' || exit 1)

    # trim the first character and last character in SSM
    SSM=${SSM:1:${#SSM}-2}

    diff .env.${STAGE} <(echo -e ${SSM})
}

function put_env {
    local STAGE=$1

    # If user confirms, put the .env.${STAGE} file to SSM
    echo "Putting .env.${STAGE} file to SSM"
    aws ssm put-parameter --name "/${PROJECT}/${STAGE}" --value "$(cat .env.${STAGE})" --type SecureString --overwrite || exit 1
}

function validate_arguments {
    local ARG1=${1:-''} # flag or stage
    local ARG2=${2:-''} # stage

    if [[ (($ARG1 != '-d' && $ARG1 != '-s') && $ARG2 != '') || (($ARG1 = '-d' || $ARG1 = '-s') && $ARG2 = '') ]]; then
        echo -e "\033[0;31mError: Invalid arguments\033[0m"
        print_help
        exit 1
    fi
}

function validate_libraries {
    for cli in "${REQUIRED_CLI[@]}"; do
        if ! command -v "$cli" &>/dev/null; then
            echo -e "\033[0;31mError: $cli could not be found\033[0m"
            exit 1
        fi
    done
}

main $1 $2
