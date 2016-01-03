package upwm.fractals.gui;

import java.awt.Color;
import java.awt.Dimension;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import upwm.fractals.Complex;
import upwm.fractals.FractalSet;

public class FractalSetController {
	private double xMin = -2.5;
	private double xMax = 1.5;
	private double yMin = -1.25;
	private double yMax = 1.25;

	private CanvasPane canvas;

	private FractalSet set;

	private static final Color GRADIENT_FIRST = Color.WHITE;
	private static final Color GRADIENT_LAST = Color.BLACK;

	private Map<Integer, Color> colors = new HashMap<Integer, Color>();

	public FractalSetController(CanvasPane canvas, FractalSet set) {
		super();
		this.canvas = canvas;
		this.set = set;

		for (int i = 0; i <= set.getMaxIterations(); i++) {
			Random r = new Random();
			Color c = new Color(r.nextInt(256), r.nextInt(256), r.nextInt(256));
			colors.put(i, c);
		}

	}

	public void paintGraph() {
		Dimension size = canvas.getSize();
		canvas.clearPoints();
		for (int x = 0; x < size.width; x++) {
			for (int y = 0; y < size.height; y++) {
				double re = xMin + (xMax - xMin) * x / size.width;
				double im = yMax - (yMax - yMin) * y / size.height;
				Complex num = new Complex(re, im);
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

		int r = (int) (degree * GRADIENT_FIRST.getRed() + (1 - degree) * GRADIENT_LAST.getRed());
		int g = (int) (degree * GRADIENT_FIRST.getGreen() + (1 - degree) * GRADIENT_LAST.getGreen());
		int b = (int) (degree * GRADIENT_FIRST.getBlue() + (1 - degree) * GRADIENT_LAST.getBlue());

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