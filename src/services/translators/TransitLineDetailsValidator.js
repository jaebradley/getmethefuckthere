export default class TransitLineDetailsValidator {
  isValid(lineDetails) {
    if (!("agencies" in lineDetails)) {
      return false;
    }

    if (!("name" in lineDetails) && !("short_name" in lineDetails)) {
      return false;
    }
  }
}
