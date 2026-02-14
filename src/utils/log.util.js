const chalk = import("chalk").then((m) => m.default);

const colorLogger = async (
  subBackgroundColor = "",
  mainBackgroundColor = "",
  mainColor = "",
  message = "",
  prePendText = "[logger]"
) => {
  try {
    const _chalk = await chalk;
    console.log(
      _chalk.bgHex(subBackgroundColor).bold(prePendText),
      _chalk.bgHex(mainBackgroundColor).hex(mainColor).bold(message)
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { colorLogger };
