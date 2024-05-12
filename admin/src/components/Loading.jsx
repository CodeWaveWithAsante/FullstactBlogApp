import { LoadingOverlay } from "@mantine/core";

export default function Loading({ visible, toggle }) {
  return (
    <LoadingOverlay
      visible={visible}
      zIndex={1000}
      transition='fade'
      overlayProps={{ radius: "sm", blur: 2 }}
      loaderProps={{ color: "blue", type: "bars" }}
    />
  );
}
