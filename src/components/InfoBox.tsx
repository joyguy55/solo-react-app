import { Box, Typography, Link } from "@mui/material";

interface infoInterface {
  name: string | undefined;
  district: string | undefined;
  phone: string | undefined;
  office: string | undefined;
  link: string | undefined;
}

const InfoBox = ({ info }: { info: infoInterface }) => {
  const { name, district, phone, office, link } = info;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "0 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Info
      </Typography>
      {/* Note: I took the liberty of a combined name. I would consult with design on this */}
      <Typography variant="subtitle1" gutterBottom>
        Name: {name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        District: {district}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: {phone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Office: {office}
      </Typography>
      <Link href={link}>{link}</Link>
    </Box>
  );
};

export default InfoBox;
