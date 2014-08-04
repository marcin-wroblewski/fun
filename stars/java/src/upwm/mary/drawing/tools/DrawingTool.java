package upwm.mary.drawing.tools;

public interface DrawingTool {

	DrawingTool startAt(int i, int j);

	DrawingTool lineTo(int i, int j);

	DrawingTool end();

}
