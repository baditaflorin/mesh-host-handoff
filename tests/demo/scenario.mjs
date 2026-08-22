export default async function hostHandoffScenario(a, b) {
  await a.getByRole("button", { name: "Claim host role" }).click();
  await b.getByText("Another peer is hosting the room.", { exact: true }).waitFor({
    timeout: 10_000,
  });
  await a.waitForTimeout(1_200);
}
