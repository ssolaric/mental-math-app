import { expect, type Page, test } from "@playwright/test";

// End-to-end happy path through the real app: landing -> pick operation ->
// pick difficulty -> play a full addition round -> see progress recorded.
// Addition is used so the expected answer is derivable from the rendered problem.

const readAdditionOperands = async (page: Page): Promise<[number, number]> => {
  const operands = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll("span"));
    const equals = spans.find((s) => s.textContent?.trim() === "=");
    const container = equals?.parentElement;
    const digits = container?.textContent?.match(/\d+/g) ?? [];
    return digits.slice(0, 2).map(Number);
  });
  if (operands.length < 2) {
    throw new Error("could not read the addition problem from the page");
  }
  return [operands[0], operands[1]];
};

const answerCurrentProblem = async (page: Page) => {
  const [a, b] = await readAdditionOperands(page);
  const input = page.getByLabel("Tu respuesta");
  await input.fill(String(a + b));
  await input.press("Enter");
};

const startAdditionEasyRound = async (page: Page) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Comenzar" }).click();
  await page.getByRole("button", { name: /Adición/ }).click();
  await page.getByRole("button", { name: /Fácil/ }).click();
  await expect(page.getByLabel("Tu respuesta")).toBeVisible();
};

test.describe("mental math app", () => {
  test("landing page offers starting a practice and viewing progress", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Matemáticas/ }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Comenzar" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Ver progreso" }),
    ).toBeVisible();
  });

  test("shows an empty progress state before any rounds are played", async ({
    page,
  }) => {
    await page.goto("/stats");
    await expect(
      page.getByText(/Aquí verás tu progreso cuando juegues/),
    ).toBeVisible();
  });

  test("navigates from operation selection to a live game", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Comenzar" }).click();
    await expect(
      page.getByRole("heading", { name: "¿Qué quieres practicar?" }),
    ).toBeVisible();

    await page.getByRole("button", { name: /Adición/ }).click();
    await expect(
      page.getByRole("heading", { name: "Elige el nivel." }),
    ).toBeVisible();

    await page.getByRole("button", { name: /Fácil/ }).click();
    await expect(page).toHaveURL(/\/game\?/);
    await expect(page.getByLabel("Tu respuesta")).toBeVisible();
  });

  test("reveals the answer when the player is wrong", async ({ page }) => {
    await startAdditionEasyRound(page);
    const [a, b] = await readAdditionOperands(page);
    const input = page.getByLabel("Tu respuesta");

    await input.fill(String(a + b + 1));
    await input.press("Enter");

    await expect(page.getByText("Enter para continuar")).toBeVisible();
    await expect(input).toBeDisabled();
  });

  test("plays a full round and records progress in stats", async ({ page }) => {
    await startAdditionEasyRound(page);

    for (let i = 0; i < 10; i++) {
      await answerCurrentProblem(page);
      if (i < 9) {
        // sync point: the arena clears the input once the answer is accepted,
        // guaranteeing the next problem is rendered before we read it
        await expect(page.getByLabel("Tu respuesta")).toHaveValue("");
      }
    }

    await expect(
      page.getByRole("button", { name: "Otra ronda" }),
    ).toBeVisible();

    await page.goto("/stats");
    await expect(page.getByText(/10\s*problemas/)).toBeVisible();
    await expect(page.getByText(/100%/).first()).toBeVisible();
  });

  test("resets progress from the stats screen", async ({ page }) => {
    await startAdditionEasyRound(page);
    for (let i = 0; i < 10; i++) {
      await answerCurrentProblem(page);
      if (i < 9) {
        await expect(page.getByLabel("Tu respuesta")).toHaveValue("");
      }
    }
    await expect(
      page.getByRole("button", { name: "Otra ronda" }),
    ).toBeVisible();

    await page.goto("/stats");
    // two-step confirm: first tap arms, second tap clears
    await page.getByRole("button", { name: "Reiniciar" }).click();
    await page
      .getByRole("button", { name: "Tocar otra vez para borrar todo" })
      .click();

    await expect(
      page.getByText(/Aquí verás tu progreso cuando juegues/),
    ).toBeVisible();
  });
});
