import { Typography } from '@mui/material';

export default function ViewDataByType({
  propertyType,
  currentProperties,
}: {
  propertyType: string;
  currentProperties: any;
}) {
  if (
    !currentProperties &&
    JSON.stringify(currentProperties) === 'false' &&
    JSON.stringify(currentProperties) === 'true'
  ) {
    return <Typography color="error">It doesn't met the criteria</Typography>;
  }

  if (propertyType === 'boolean') {
    if (JSON.stringify(currentProperties) === 'false') {
      return <>FALSE</>;
    } else {
      return <>TRUE</>;
    }
  }

  if (propertyType === 'array') {
    return (
      <>
        {currentProperties.map((item: any, index: number) => (
          <Typography variant="body2" key={index}>
            {item}
          </Typography>
        ))}
      </>
    );
  }

  return <>{currentProperties}</>;
}
