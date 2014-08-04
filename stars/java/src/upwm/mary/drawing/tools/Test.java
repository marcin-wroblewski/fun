package upwm.mary.drawing.tools;

public class Test {
	public static void main(String[] args) {
		DrawingTool drawingTool = DrawingTools.create();
		drawingTool.startAt(0,0).lineTo(100,50).lineTo(200,400).end();
	}
}
