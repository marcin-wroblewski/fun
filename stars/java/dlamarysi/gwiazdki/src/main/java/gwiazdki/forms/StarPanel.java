package gwiazdki.forms;

import gwiazdki.model.Point;

import java.awt.Graphics;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.swing.JPanel;

public class StarPanel extends JPanel {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3206579144828703150L;
	private List<Point> points = Collections.emptyList();

	private Point getCenter() {
		return Point.create().setX(this.getWidth() / 2)
				.setY(this.getHeight() / 2);
	}

	private Point toPanelPoint(Point point, Point center) {
		return Point.create().setX(point.getX() + center.getX())
				.setY(-point.getY() + center.getY());
	}

	public void setPoints(List<Point> points) {
		Point center = getCenter();
		this.points = points.stream().map(p -> toPanelPoint(p, center))
				.collect(Collectors.toList());
	}

	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		if (points.size() > 0) {
			paintLines(g);
		}
	}

	private void paintLines(Graphics g) {
		Point firstPoint = points.get(0);
		Point previous = firstPoint;
		Point current = firstPoint;
		for (int i = 1; i < points.size(); i++) {
			current = points.get(i);
			paintLine(g, previous, current);
			previous = current;
		}
		paintLine(g, current, firstPoint);
	}

	private void paintLine(Graphics g, Point start, Point end) {
		int x1 = (int) start.getX();
		int y1 = (int) start.getY();
		int x2 = (int) end.getX();
		int y2 = (int) end.getY();
		g.drawLine(x1, y1, x2, y2);
	}
}
