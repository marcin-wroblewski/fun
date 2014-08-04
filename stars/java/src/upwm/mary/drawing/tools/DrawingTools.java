package upwm.mary.drawing.tools;

import upwm.mary.drawing.tools.simple.Simple;

public class DrawingTools {

	public static DrawingTool create(int width, int height) {
		return new Simple(width, height);
	}

	public static DrawingTool create() {
		return create(800, 600);
	}
	
	

}
