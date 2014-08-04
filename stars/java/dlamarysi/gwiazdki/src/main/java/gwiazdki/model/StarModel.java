package gwiazdki.model;

import static java.lang.Math.PI;
import static java.lang.Math.cos;
import static java.lang.Math.sin;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class StarModel {
	private double innerCircleRadius = 10;
	private double outerCircleRadius = 20;
	private int pointCount = 5;
	private double angle = 0;
	
	private StarModel() {
		
	}
	
	public StarModel setAngle(double angle) {
		this.angle = angle;
		return this;
	}
	
	public StarModel setInnerCircleRadius(double innerCircleRadius) {
		this.innerCircleRadius = innerCircleRadius;
		return this;
	}
	
	public StarModel setOuterCircleRadius(double outerCircleRadius) {
		this.outerCircleRadius = outerCircleRadius;
		return this;
	}
	
	public StarModel setPointCount(int pointCount) {
		this.pointCount = pointCount;
		return this;
	}

	public List<Point> getPoints() {
		Iterator<Point> outerPoints = getOuterCirclePoints().iterator();
		Iterator<Point> innerPoints = getInnerCirclePoints().iterator();
		
		List<Point> points = new ArrayList<>(2 * pointCount );
		
		while(outerPoints.hasNext()) {
			points.add(outerPoints.next());
			points.add(innerPoints.next());
		}
		
		return points;
	}

	private List<Point> getOuterCirclePoints() {
		return getPoints(outerCircleRadius, angle, pointCount, 0);
	}

	private List<Point> getInnerCirclePoints() {
		return getPoints(innerCircleRadius, angle, pointCount, 1.0 / 2.0);
	}

	private static List<Point> getPoints(double circleRadius, double angle,
			int count, double shift) {
		List<Point> points = new ArrayList<Point>(count);
		double step = 2 * PI / count;
		angle += shift * step;
		for (int i = 0; i < count; i++) {
			double currentAngle = angle + (i * step);
			Point point = Point.create().setX(circleRadius * cos(currentAngle))
					.setY(circleRadius * sin(currentAngle));
			points.add(i, point);
		}

		return points;
	}
	
	public static StarModel createStarModel() {
		return new StarModel();
	}

}
