import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(testsDirectory, "..");

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
    })
  );
  return nested.flat();
}

test("all locally declared website images exist", async () => {
  const sourceRoot = path.join(repositoryRoot, "src");
  const sourceFiles = (await collectFiles(sourceRoot)).filter((file) =>
    /\.(?:ts|tsx)$/.test(file)
  );
  const declaredImages = new Set();

  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");
    for (const match of source.matchAll(/\/images\/[a-z0-9./-]+\.(?:png|webp|svg)/gi)) {
      declaredImages.add(match[0]);
    }
  }

  assert.ok(declaredImages.size >= 20, "expected a complete local image set");
  await Promise.all(
    [...declaredImages].map((imagePath) =>
      access(path.join(repositoryRoot, "public", imagePath))
    )
  );
});

test("source contains no prototype brand, remote prototype assets, or empty hashes", async () => {
  const sourceFiles = (await collectFiles(path.join(repositoryRoot, "src"))).filter(
    (file) => /\.(?:ts|tsx|css|svg)$/.test(file)
  );
  const combinedSource = (
    await Promise.all(sourceFiles.map((file) => readFile(file, "utf8")))
  ).join("\n");

  assert.doesNotMatch(combinedSource, /Estrella Coffee Roasters/i);
  assert.doesNotMatch(combinedSource, /googleusercontent\.com/i);
  assert.doesNotMatch(combinedSource, /href\s*=\s*["']#["']/i);
});

test("landing page keeps one h1 and all required sections", async () => {
  const componentFiles = (await collectFiles(path.join(repositoryRoot, "src"))).filter(
    (file) => /\.tsx$/.test(file)
  );
  const components = (
    await Promise.all(componentFiles.map((file) => readFile(file, "utf8")))
  ).join("\n");
  const page = await readFile(path.join(repositoryRoot, "src/app/page.tsx"), "utf8");

  assert.equal((components.match(/<h1\b/g) ?? []).length, 1);
  for (const section of [
    "Hero",
    "FeaturedCoffee",
    "Story",
    "Origins",
    "CoffeeProcess",
    "CafeMenu",
    "Sustainability",
    "ExperienceGallery",
    "Locations",
    "SharedMoments",
    "Newsletter",
  ]) {
    assert.match(page, new RegExp(`<${section}\\s*/>`));
  }
});

test("hero is editorial, video-led and starts with a white loader", async () => {
  const hero = await readFile(
    path.join(repositoryRoot, "src/components/sections/Hero.tsx"),
    "utf8"
  );

  // El hero comienza en blanco y muestra el vídeo sin una fotografía previa.
  assert.doesNotMatch(hero, /from "next\/image"/);
  assert.doesNotMatch(hero, /\/images\/gallery\/barista-brewing\.webp/);
  assert.match(hero, /hero-video-loader/);
  assert.match(hero, /<motion\.video/);
  assert.match(hero, /object-cover/);

  // Sin el bloque de copy y CTAs del hero anterior.
  assert.doesNotMatch(hero, /Donde el origen/i);
  assert.doesNotMatch(hero, /Descubrir nuestro caf/i);
  assert.doesNotMatch(hero, /href="#nuestro-cafe"/);
  assert.doesNotMatch(hero, /href="#menu"/);

  // Un único h1, visible y con la tipografía display (no oculto).
  assert.equal((hero.match(/<h1\b/g) ?? []).length, 1);
  assert.match(hero, /font-display/);
  assert.doesNotMatch(hero, /id="inicio-heading"\s+className="sr-only"/);
  assert.doesNotMatch(hero, /clamp\(2\.5rem,9vw,6\.5rem\)/);

  // Como máximo dos elementos superpuestos sobre la fotografía.
  assert.ok((hero.match(/absolute bottom-/g) ?? []).length <= 2);

  // El hero ya no depende del prototipo 3D.
  assert.doesNotMatch(hero, /CoffeeFlowerStage/);
});

test("left-aligned display headings condense from the left edge", async () => {
  const [heading, globalStyles] = await Promise.all([
    readFile(
      path.join(repositoryRoot, "src/components/ui/SectionHeading.tsx"),
      "utf8"
    ),
    readFile(path.join(repositoryRoot, "src/app/globals.css"), "utf8"),
  ]);

  assert.match(
    heading,
    /align === "left" && "font-display-origin-left"/
  );
  assert.match(
    globalStyles,
    /\.font-display\.font-display-origin-left\s*\{[^}]*transform-origin:\s*left center;/s
  );
});

test("desktop cafe menu gives its stagger observer a visible grid box", async () => {
  const cafeMenu = await readFile(
    path.join(repositoryRoot, "src/components/sections/CafeMenu.tsx"),
    "utf8"
  );

  assert.doesNotMatch(cafeMenu, /<StaggerGroup className="contents">/);
  assert.match(
    cafeMenu,
    /<div className="hidden lg:block">\s*<StaggerGroup className="grid grid-cols-3 gap-x-10 gap-y-12">/
  );
  assert.match(cafeMenu, /<div className="lg:hidden">/);
});

test("origin profiles use generated photographic assets", async () => {
  const origins = await readFile(
    path.join(repositoryRoot, "src/data/origins.ts"),
    "utf8"
  );

  for (const country of ["el-salvador", "colombia", "ethiopia", "guatemala"]) {
    assert.match(
      origins,
      new RegExp(`/images/origins/${country}-coffee-farm\\.webp`)
    );
  }
  assert.doesNotMatch(origins, /map-[a-z-]+\.svg/);
});
