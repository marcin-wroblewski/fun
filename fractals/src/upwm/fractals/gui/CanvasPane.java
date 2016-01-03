package upwm.fractals.gui;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.swing.JPanel;

@SuppressWarnings("serial")
public class CanvasPane extends JPanel {
	private Map<Color, Collection<Point>> points = new HashMap<Color, Collection<Point>>();

	public CanvasPane setPoint(Point p, Color c) {
		getColorPoints(c).add(p);
		return this;
	}

	public CanvasPane setPoint(int x, int y, Color c) {
		getColorPoints(c).add(new Point(x, y));
		return this;
	}

	public CanvasPane clearPoints() {
		points.clear();
		return this;
	}

	private Collection<Point> getColorPoints(Color c) {
		Collection<Point> colorPoints = points.get(c);
		if (colorPoints == null) {
			colorPoints = new ArrayList<Point>();
			points.put(c, colorPoints);
		}
		return colorPoints;
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		points.keySet().forEach(c -> {
			g.setColor(c);
			points.get(c).forEach(p -> g.fillRect(p.x, p.y, 1, 1));
		});
	}

}
