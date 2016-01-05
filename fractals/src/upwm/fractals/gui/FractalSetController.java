package upwm.fractals.gui;

import java.awt.Color;
import java.awt.Dimension;

import upwm.fractals.Complex;
import upwm.fractals.FractalSet;

public class FractalSetController {
	private double xMin = -2.5;
	private double xMax = 1.5;
	private double yMin = -1.25;
	private double yMax = 1.25;

	private CanvasPane canvas;

	private FractalSet set;

	private Color gradientStart = Color.WHITE;
	private Color gradientEnd = Color.BLACK;

	public FractalSetController(CanvasPane canvas, FractalSet set) {
		super();
		this.canvas = canvas;
		this.set = set;
	}
	
	public void setIterations(int iterations) {
		this.set.setMaxIterations(iterations);
		paintGraph();
	}
	
	public void setGradientStart(Color gradientStart) {
		this.gradientStart = gradientStart;
		paintGraph();
	}
	
	public void setGradientEnd(Color gradientEnd) {
		this.gradientEnd = gradientEnd;
		paintGraph();
	}
	
	public void setSet(FractalSet set) {
		this.set = set;
		paintGraph();
	}
	
	public void afterSetModified() {
		paintGraph();
	}

	public void paintGraph() {
		Dimension size = canvas.getSize();
		canvas.clearPoints();
		
		
		for (int x = 0; x < size.width; x++) {
			for (int y = 0; y < size.height; y++) {
				double re = xMin + (xMax - xMin) * x / size.width;
				double im = yMax - (yMax - yMin) * y / size.height;
				Complex num = new Complex(re, im);
//				int level = set.check(re, im);
				int level = set.check(num);
				Color c = getColor(level);
				canvas.setPoint(x, y, c);
			}
		}
		canvas.repaint();
	}

	private Color getColor(int level) {
		float degree = (float) level / set.getMaxIterations();
		degree = (float) Math.sqrt(degree);

		int r = (int) (degree * gradientStart.getRed() + (1 - degree) * gradientEnd.getRed());
		int g = (int) (degree * gradientStart.getGreen() + (1 - degree) * gradientEnd.getGreen());
		int b = (int) (degree * gradientStart.getBlue() + (1 - degree) * gradientEnd.getBlue());

		return new Color(r, g, b);
	}

	public void zoomIn(int a, int b) {
		Dimension size = canvas.getSize();
		double width = xMax - xMin;
		double height = yMax - yMin;

		double x = xMin + (width) * a / size.width;
		double y = yMax - (height) * b / size.height;

		xMax = x + width / 4;
		xMin = x - width / 4;
		yMax = y + height / 4;
		yMin = y - height / 4;

		paintGraph();

	}

	public void zoomOut(int a, int b) {
		Dimension size = canvas.getSize();
		double width = xMax - xMin;
		double height = yMax - yMin;

		double x = xMin + (width) * a / size.width;
		double y = yMax - (height) * b / size.height;

		xMax = x + width;
		xMin = x - width;
		yMax = y + height;
		yMin = y - height;

		paintGraph();
	}
}