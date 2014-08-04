package upwm.mary.drawing.tools.simple;

import static javax.swing.JFrame.EXIT_ON_CLOSE;

import java.awt.Graphics;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.swing.JFrame;
import javax.swing.JPanel;

import upwm.mary.drawing.tools.DrawingTool;
import upwm.mary.drawing.tools.shapes.Line;
import upwm.mary.drawing.tools.shapes.Point;
import upwm.mary.drawing.tools.shapes.Shape;
import upwm.mary.drawing.tools.shapes.Shapes;

public class Simple implements DrawingTool {
	private JFrame frame;
	private Point lastPoint = Shapes.point(0, 0);
	private List<Shape> toDraw = new ArrayList<>();
	
	private class DrawPanel extends JPanel {
		@Override
		protected void paintComponent(Graphics g) {
			for (Shape shape : toDraw) {
				Line line = (Line) shape;
				g.drawLine(line.getStart().x(), line.getStart().y(), line.getEnd()
						.x(), line.getEnd().y());
			}
//			toDraw.clear();
		}
	}

	public Simple(int width, int height) {
		frame = new JFrame();
		frame.setDefaultCloseOperation(EXIT_ON_CLOSE);
		frame.setSize(width, height);
		frame.setVisible(true);
		
		JPanel panel = new DrawPanel();
		frame.setContentPane(panel);
	}

	@Override
	public DrawingTool startAt(int x, int y) {
		lastPoint = Shapes.point(x, y);
		return this;
	}

	@Override
	public DrawingTool lineTo(int x, int y) {
		Point start = lastPoint;
		Point end = Shapes.point(x, y);
		toDraw.add(Shapes.line(start, end));
		lastPoint = end;
		return this;
	}

	private void drawAll() {
		frame.repaint();
	}

	@Override
	public DrawingTool end() {
//		drawAll();
		return this;
	}

}
