import { inspect } from "util";
import { window } from "vscode";

export const log = new (class {
  private readonly output = window.createOutputChannel(
    "beancount-language-server"
  );

  info(...msg: [unknown, ...unknown[]]): void {
    log.write("INFO", ...msg);
  }

  debug(...msg: [unknown, ...unknown[]]): void {
    log.write("DEBUG", ...msg);
  }

  error(...msg: [unknown, ...unknown[]]): void {
    log.write("ERROR", ...msg);
    log.output.show(true);
  }

  private write(label: string, ...messageParts: unknown[]): void {
    const message = messageParts.map(log.stringify).join(" ");
    const dateTime = new Date().toLocaleString();
    log.output.appendLine(`${label} [${dateTime}]: ${message}`);
  }

  private stringify(val: unknown): string {
    if (typeof val === "string") return val;
    return inspect(val, {
      colors: false,
      depth: 6, // heuristic
    });
  }
})();
