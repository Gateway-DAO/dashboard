'use client';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import { useToggle } from '@react-hookz/web';
import ChipInputType from '@/components/chip-input-type/chip-input-type';
import getClaimType, { ClaimFieldProps } from '@/utils/get-claim-type';
import { grey } from '@mui/material/colors';
import ToggleDropIcon from '@/components/toggle-drop-icon/toggle-drop-icon';

export default function Row({
  property,
  showCollapse,
}: {
  property: ClaimFieldProps;
  showCollapse: boolean;
}) {
  console.log(property);
  const [showExamples, toggleShowExamples] = useToggle(false);
  const hasExample =
    property.type !== 'boolean' && (property.examples ?? []).length > 0;

  return (
    <>
      <TableRow
        key={property.title}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          ...(hasExample && {
            '& > *': {
              borderBottom: 'unset',
            },
          }),
        }}
      >
        {showCollapse && !hasExample && <TableCell />}
        {showCollapse && hasExample && (
          <TableCell>
            <IconButton onClick={toggleShowExamples}>
              <ToggleDropIcon active={showExamples} />
            </IconButton>
          </TableCell>
        )}
        <TableCell scope="row">{property.title}</TableCell>
        <TableCell align="right">
          <ChipInputType
            type={getClaimType({
              type: property.type,
              contentMediaType: property.contentMediaType,
              format: property.format,
            })}
          />
        </TableCell>
      </TableRow>
      {hasExample && (
        <TableRow>
          <TableCell colSpan={3} sx={{ p: 0 }}>
            <Collapse in={showExamples} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  py: 1,
                  pl: '88px',
                  backgroundColor: grey['100'],
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Examples
                </Typography>
                <List>
                  {property.examples?.map((example, index) => (
                    <ListItem disableGutters key={index}>
                      {example}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
