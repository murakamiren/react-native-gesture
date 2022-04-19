import { VFC } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

type contextType = {
	translateX: number;
	translateY: number;
};

const MoveCircle: VFC = () => {
	const circleSize = 100;
	const circleSizeHalf = circleSize / 2;

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, contextType>({
		onStart: (e, context) => {
			context.translateX = translateX.value;
			context.translateY = translateY.value;
		},
		onActive: (e, context) => {
			// console.log(e.translationX);
			translateX.value = e.translationX + context.translateX;
			translateY.value = e.translationY + context.translateY;
		},
		onEnd: (e) => {
			translateX.value = withSpring(0);
			translateY.value = withSpring(0);
		},
	});

	const styleWhenGesture = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value,
				},
				{
					translateY: translateY.value,
				},
			],
		};
	});

	const styles = StyleSheet.create({
		circle: {
			width: circleSize,
			height: circleSize,
			borderRadius: circleSizeHalf,
			backgroundColor: "pink",
		},
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<PanGestureHandler onGestureEvent={panGestureEvent}>
				<Animated.View style={[styles.circle, styleWhenGesture]} />
			</PanGestureHandler>
		</View>
	);
};

export default MoveCircle;
