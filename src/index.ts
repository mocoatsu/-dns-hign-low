import dns from "dns";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const domains = [
  "example1.com",
  "example2.com",
  "example3.com",
  "google.com",
  "facebook.com",
  "amazon.com",
  "microsoft.com",
  "apple.com",
];

export function ipToNumber(ip: string): number {
  return parseInt(
    ip
      .split(".")
      .map((octet) => octet.padStart(3, "0"))
      .join(""),
    10
  );
}

export async function lookup(domain: string): Promise<string> {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address) => {
      if (err) reject(err);
      else resolve(address);
    });
  });
}

async function game() {
  let score = 0;
  let currentIp = await lookup(
    domains[Math.floor(Math.random() * domains.length)]
  );

  console.log(`Current IP: ${currentIp}`);

  while (true) {
    const nextDomain = domains[Math.floor(Math.random() * domains.length)];
    const nextIp = await lookup(nextDomain);

    const answer = await new Promise<string>((resolve) => {
      rl.question(
        `Is the IP of ${nextDomain} higher or lower than ${currentIp}? (h/l) `,
        resolve
      );
    });

    if (
      (answer === "h" && ipToNumber(nextIp) > ipToNumber(currentIp)) ||
      (answer === "l" && ipToNumber(nextIp) < ipToNumber(currentIp))
    ) {
      score++;
      console.log("Correct!");
    } else {
      console.log(`Incorrect. The IP of ${nextDomain} was ${nextIp}.`);
      break;
    }

    currentIp = nextIp;
  }

  console.log(`Game over. Your score was ${score}.`);

  rl.close();
}

game().catch(console.error);
