import { useSelector } from "react-redux";

function useCanDispense(cocktail) {
  const robotUrl = useSelector(
    (state) => state.settings.robot && state.settings.robot.url,
  );
  const robotConnected = useSelector((state) => state.robot.connected);
  const robotState = useSelector((state) => state.robot.robotState);
  const bar = useSelector((state) => state.bar);

  const robotIdle = robotConnected && robotState && robotState.state === "idle";
  const robotBusy =
    robotConnected &&
    robotState &&
    ["working", "waiting_for_glass", "drink_ready"].includes(robotState.state);

  const hasDispensable =
    !!cocktail &&
    cocktail.ingredients.some((ing) =>
      bar.some(
        (item) =>
          item &&
          (ing.ingredient === item.type || ing.ingredient === item.ingredient),
      ),
    );

  return {
    robotUrl,
    robotConnected,
    canDispense: !!robotUrl && robotIdle && hasDispensable,
    robotBusy,
    hasDispensable,
  };
}

export default useCanDispense;
