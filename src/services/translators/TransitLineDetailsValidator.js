export default class TransitLineDetailsValidator {
  isValid(lineDetails) {
    if (!("agencies" in lineDetails)) {
      return false;
    }

    if (!("name" in lineDetails) and !("short_name" in lineDetails)) {
      return false;
    }
  }
}
