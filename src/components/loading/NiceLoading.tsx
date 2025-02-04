'use client'

import { Skeleton, Stack } from "@mantine/core";

export function NiceLoading() {
  
  return (
    <div>
      {new Array(3).fill(0).map((_, index) => (
        <Stack key={index} gap="xs">
          <Skeleton height={16} mt="sm" />
          <Skeleton height={36} />
        </Stack>
      ))}
    </div>
  );
}
