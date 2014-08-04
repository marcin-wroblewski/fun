package upwm.mary.drawing.tools.shapes;

public class Shapes {

	private static Shapes self = new Shapes();

	private class SimplePoint implements Point {
		private int x;
		private int y;

		private SimplePoint(int x, int y) {
			this.x = x;
			this.y = y;
		}

		@Override
		public int x() {
			return x;
		}

		@Override
		public int y() {
			return y;
		}
	}

	private class SimpleLine implements Line {
		private Point start;
		private Point end;

		private SimpleLine(Point start, Point end) {
			this.start = start;
			this.end = end;
		}

		@Override
		public Point getEnd() {
			return end;
		}

		@Override
		public Point getStart() {
			return start;
		}
	}

	private Shapes() {

	}

	public static Point point(int x, int y) {
		return self.new SimplePoint(x, y);
	}

	public static Line line(Point start, Point end) {
		return self.new SimpleLine(start, end);
	}

}
