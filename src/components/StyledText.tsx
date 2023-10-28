import { Text, TextProps } from "./Themed";

export function InterBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "InterBold" }]} />;
}

export function InterMediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterMedium" }]} />
  );
}

export function InterRegularText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterRegular" }]} />
  );
}
