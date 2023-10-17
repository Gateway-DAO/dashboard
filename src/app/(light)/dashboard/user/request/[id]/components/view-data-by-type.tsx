import { Typography } from '@mui/material';

export default function ViewDataByType({
  propertyType,
  currentProperties,
  valid,
}: {
  propertyType: string;
  currentProperties: any;
  valid: boolean;
}) {
  if (
    (!currentProperties &&
      JSON.stringify(currentProperties) === 'false' &&
      JSON.stringify(currentProperties) === 'true') ||
    !valid
  ) {
    return (
      <Typography color="error">{`It doesn't met the criteria`}</Typography>
    );
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
