import { VFC } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

type contextType = {
	translateX: number;
	translateY: number;
};

const MoveCircle: VFC = () => {
	const circleSize = 80;
	const circleSizeHalf = circleSize / 2;

	const bigCircle = circleSize * 4;

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const radius = useSharedValue(circleSizeHalf / 2);
	const scale = useSharedValue(0.8);

	const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, contextType>({
		onStart: (e, context) => {
			context.translateX = translateX.value;
			context.translateY = translateY.value;
			radius.value = withTiming(circleSizeHalf);
			scale.value = withSpring(1.5);
		},
		onActive: (e, context) => {
			// console.log(e.translationX);
			translateX.value = e.translationX + context.translateX;
			translateY.value = e.translationY + context.translateY;
		},
		onEnd: (e) => {
			radius.value = withTiming(circleSizeHalf / 2);
			scale.value = withSpring(0.8);

			//三平方
			const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
			const range = bigCircle / 2 - circleSizeHalf;

			console.log(distance, range);

			if (distance > range) {
				translateX.value = withSpring(0);
				translateY.value = withSpring(0);
			}
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
				{
					scale: scale.value,
				},
			],
			borderRadius: radius.value,
		};
	});

	const styles = StyleSheet.create({
		circle: {
			width: circleSize,
			height: circleSize,
			borderRadius: circleSizeHalf,
			backgroundColor: "pink",
		},
		bigCircle: {
			width: bigCircle,
			height: bigCircle,
			borderRadius: bigCircle / 2,
			borderColor: "#333",
			justifyContent: "center",
			alignItems: "center",
			borderWidth: 2,
		},
	});

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View style={styles.bigCircle}>
				<PanGestureHandler onGestureEvent={panGestureEvent}>
					<Animated.View style={[styles.circle, styleWhenGesture]} />
				</PanGestureHandler>
			</View>
		</View>
	);
};

export default MoveCircle;
