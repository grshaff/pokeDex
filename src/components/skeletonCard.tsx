import { Card, CardContent, Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <Card
      sx={{
        width: { xs: "250px", sm: "250px", md: "240px", lg: "300px" },
        maxheight: "550px",
        boxShadow: 3,
        borderRadius: "15px",
      }}
    >
      <Skeleton variant="rectangular" height={"300px"} />
      <CardContent>
        <Skeleton width="60%" />
        <Skeleton width="80%" />
      </CardContent>
    </Card>
  );
}
