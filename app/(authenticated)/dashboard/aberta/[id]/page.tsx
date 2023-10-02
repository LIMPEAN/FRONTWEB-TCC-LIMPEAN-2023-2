'use client';
import { useRouter } from "next/router";

export default function AbertaDiarista() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
    {/* {id} */}
    </>
  )
}