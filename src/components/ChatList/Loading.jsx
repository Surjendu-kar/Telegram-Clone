import { Skeleton, Stack, styled } from "@mui/material";

// Styled Components
const Container = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 2),
}));

const Row = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(0.7),
}));

const CircularSkeleton = styled(Skeleton)(({ theme }) => ({
  width: theme.spacing(6.875),
  height: theme.spacing(6.875),
}));

const RectangularSkeleton = styled(Skeleton)(({ theme }) => ({
  height: theme.spacing(1.3),
  borderRadius: theme.spacing(1),
}));

const SkeletonContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: theme.spacing(1),
}));

// CONSTANTS
const LOADING_ITEMS = 20;

const Loading = () => {
  return (
    <Container>
      {Array.from({ length: LOADING_ITEMS }).map((_, index) => (
        <Row key={index}>
          <CircularSkeleton variant="circular" animation="wave" />
          <SkeletonContainer>
            <Row flex={1} justifyContent="space-between">
              <RectangularSkeleton
                width="30%"
                variant="rectangular"
                animation="wave"
              />
              <RectangularSkeleton
                width="10%"
                variant="rectangular"
                animation="wave"
              />
            </Row>
            <RectangularSkeleton
              width="70%"
              variant="rectangular"
              animation="wave"
            />
          </SkeletonContainer>
        </Row>
      ))}
    </Container>
  );
};

export default Loading;
