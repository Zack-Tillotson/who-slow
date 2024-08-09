import { Button } from "@mantine/core";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <h1>Campaign list</h1>
      <Button component={Link} href='/app/campaign/1/'>View</Button>
    </>
  );
}
