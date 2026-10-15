<script lang="ts">
  import { initials, resolveAsset } from "../helpers/toolsHelper";

  /**
   * `decorative`: gunakan bila nama pengguna sudah tertulis sebagai teks di dekatnya,
   * agar pembaca layar tidak membacanya dua kali (aturan axe `image-redundant-alt`).
   */
  let {
    name,
    src = null,
    size = "md",
    decorative = false,
  }: { name: string; src?: string | null; size?: "sm" | "md" | "lg"; decorative?: boolean } =
    $props();

  const url = $derived(resolveAsset(src));
  const sizes = { sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-24 text-2xl" };
</script>

{#if url}
  <img
    src={url}
    alt={decorative ? "" : name}
    class={`rounded-full object-cover ${sizes[size]}`}
  />
{:else}
  <span
    class={`grid place-items-center rounded-full bg-ink-100 font-semibold text-ink-700 ${sizes[size]}`}
    role={decorative ? undefined : "img"}
    aria-label={decorative ? undefined : name}
    aria-hidden={decorative ? "true" : undefined}
  >
    {initials(name)}
  </span>
{/if}