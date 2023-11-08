'use client';

import { CardCellContainer } from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import CopyButton from '@/components/copy-button/copy-button';
import { transaction_detail } from '@/locale/en/transaction';
import { useToggle } from '@react-hookz/web';
import { CodeBlock, dracula } from 'react-code-blocks';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Box,
  Card,
  Collapse,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

const result = `{
    "id": "be0ab9ac-0359-4466-b8d7-eb9a06b8ea8f",
    "cipher": {
      "id": "86a9acbd-4d00-4b0b-bf99-f624578fd919",
      "aesBlob": "iC3K5dx6S11MkJ/KCr3EB5+aVit7vHXpWfzFbjLmraVJAK4mXRdmTq3N8ppEG9vWAsVX2qM4kGe1KGzpUkieypsmplpg9f9HXDDC3CzEb6VgYWHutSUUy1Z5cWxE6+VK2CPy8OaAOm+fvkr19TzktJjercJrb/P8sdcU5/xu5M2tl4JlC+K+/asqPfjaUQFhBtXr2T7/REmqbIsWeD2vBCyDd3UKh5dDCbMWliqiEI3scPIuQ5MIGYnRs5Bt0G6UNyU7C+29pmtEW28Yy6/Gl+Qb/zxWnUZDRz8BB1nPioDv+q6d7tNjUOUrDsIqL9TtRcqdxeTpHTQGGTnrFpghu9eZrmBI/TC4HFIp9z6peuI8tgQuLQM1AM8D7KKNzrjxlwMIX/pAJ3lZQiEjTJqUQShgwD/5OFEuLLk7S55iRnTFIgKJ3+sRq+bxQQKl04aG1Ritl+8AnJaIc6hzTwB5A2H0jBnZLYWc6W4YR+C/v9hA/6W0YYDSNMFYVEJlLCXKd2qYeyfA6TWzJ865DfXAYcxQPk0eYf6xMLHy4Kgu6soTnjGIgwcRAZqXk0F5QqyuI2eR5Gml3LlQptU3wUlfUjPvJaJ/qjjTxr41qXLfdFAXtHLOQxh3RbYZ/i9qWnJvSgPG/9KsxDWYp/pBYFdzOEMcVRem8GbAjOPmyfqgK1Ifj85y33WQF163WSoTFRahHEZUhKan1J2x35Pv3kcu5uqOQUBkAR/gvsdrxw==",
      "issuerKeyBlob": "FM+Xy9CXA5lszjWzhGrjmt7CU16kjgXiEVQbOyEKX+TL2YxG2G2UH8Hq8XIquBZ5rYBLGnIvoDJN6b2RBYiOdlf75jUFzoaI0b/putMa2hlP495wkGwM2sM0VlfVj4b0QmxvN8vxX/KJxnfr/6qyaD3HKoEgQAYQbzZ3v9uyTduyFXx3duVG8/3iXh+0/Zz3SufzyOPgBpbSks16/J25SqSicUlYoIPMpcf2fH6u0D/Xx0jkXUvGfKNpaViXqwvIiEVaoAkUjXlglk8QrXD9niyfKAfP8Lznvq+fMWXpIoB/oEDjaIqMAiGvTUyslxEg5EbBZaBHunC78iXXFM1/voO60n5H+ajKQcn4MdtGlADgwbJBGoXCCulYBd/lCTYIj3EDHqkpHXaQsKOQxrROtk62C9X1r1W9hoZAr2ntW32RduC8eL+QbPmoxeEEkYdLwW+CRRumtbdV8myH0DGIGLj+UtPf7uGYiSiHhsh6L99pYDhpQjFGVQlxkZVFg3wC97m7R7FJpIRJDNzb4hn8e+w8WnGx2zNjFbpWePw3ScNBnGfcwqY6OLFTzEuGoB3WEfOWGNXxi0If6YdykG2zKrszbYSsxHxVySsz/43ieez9hsUHeHGKjXNy/uWku4GKdR5G3GgfSxUY6F35fOIOPEkyQDERQ2MjZzeo7WeoZNg=",
      "ownerKeyBlob": "uFwnOXvY0UWk0J80O7tA0pG8Rd2CG4MXCaKvGAL0drqPtyc8u9Q1N8PTDCwJbIdDvSvoQdLcShk0iASHDsDGC3gV2Cg7uUqxal4luGMFzC5eBbD3cOUh99UySajH6ZdOHEO7EQuaLSVejjkRq2kCYKaFBbCwgl4bjTix62JfcjvP4C2tTRXVzTKAxpt5HoZ26eVdKPyuXfWbu3mvSBriCZ4a8+k1sqQEWyA2AR1CUhrMLq1/JA+pEBsVj7uWTe11gX1EyZrFf1HbJ3Z2souz0xFJ8T1MIipnMYc4I4aw3iQv2Q4847EQnzSHPE2QB6F0/aDzDM3ZSqXexbAWetYNnbHf/Y+Tnpw9Gxfl7lLfVQKGAR5oP3qGpGb1lorfGL114JMJ3CmJLz5roMFmJANCShycZIeQnwR2z3XjFUKf9NvBp4V3HQHUfMnIDwukYEs92HuGHYXP91dgw+ICM7o77lbtnGr8uCQMoeUetdYDvd4Y7h/FRTGSK5tgsXz7RbmUim1kgZiPozeAiXjqqlUfj8rk05u2QjRrRlZhJg9Rl+wLt1MaGF/pAZvWlXbaatOiEtyqrn59uoVJFwHm/+6IB7r9Nx6jFMF5CgQ75l9EFrXm9jK/D4XWhFIIVmkkb3YmIWT51s8tBhtcVvmrafOFi8DqW6CsDXuGJFzkMLXAgbc=",
      "iv": "5WzpCbag+Ox785xL",
      "tag": "j/zORopMM8wjf4wBUyhOxQ=="
    },
    "claimHash": {
      "0bb87aaabf8331346978f1496231915c8f6b49aa268f8e900e2886066e85523e7380b86b6240e0a7a95339ddc6da75ac": "7cc892ba4d1ea1fd5f244b4c27e59a223d9c1083b1c4fc4724d673efddf50e9daf308eaf8c144736b7d7ee41cd35da61"
    },
    "status": "VALID",
    "dataModel": { "id": "d4761c00-d807-46bd-8b98-70b975492033" },
    "issuer": { "id": "fc7af2f6-c880-460c-8eb6-79419a534805" },
    "owner": { "id": "5a6576ae-6e9a-4447-b033-15bec671af83" }
  }
  `;

const codeResultArweaveProps = {
  text: result,
  theme: dracula,
  language: 'json',
};

export default function TransactionData() {
  const [displayData, toggleData] = useToggle(false);
  return (
    <Container sx={{ pb: 4 }}>
      <Box sx={{ maxWidth: 777 }}>
        <Stack
          component={Card}
          variant="outlined"
          sx={{
            mb: 3,
            overflow: 'visible',
          }}
          divider={
            <Divider
              sx={{
                width: '100%',
              }}
            />
          }
        >
          <TableCellContainer>
            <CardCellContainer>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  {transaction_detail.transaction_data}
                </Typography>
                <Box>
                  <CopyButton variant="text" text={result} />
                  <IconButton size="small" onClick={toggleData}>
                    {displayData ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </Box>
              </Stack>
              <Collapse in={displayData}>
                <Box pt={2}>
                  <CodeBlock {...codeResultArweaveProps} />
                </Box>
              </Collapse>
            </CardCellContainer>
          </TableCellContainer>
        </Stack>
      </Box>
    </Container>
  );
}
