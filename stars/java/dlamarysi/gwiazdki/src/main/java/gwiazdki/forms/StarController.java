package gwiazdki.forms;

import gwiazdki.model.StarModel;

public class StarController {
	private StarModel starModel;
	private StarPanel starPanel;
	
	public StarController(StarModel starModel, StarPanel starPanel) {
		super();
		this.starModel = starModel;
		this.starPanel = starPanel;
	}

	public StarController changePointsCount(int newVal) {
		starModel.setPointCount(newVal);
		repaintStar();
		return this;
	}
	
	public StarController changeAngle(double angle) {
		starModel.setAngle(angle);
		repaintStar();
		return this;
	}
	
	public StarController resizeInnerCircle(double radius) {
		starModel.setInnerCircleRadius(radius);
		repaintStar();
		return this;
	}
	
	public StarController resizeOuterCircle(double radius) {
		starModel.setOuterCircleRadius(radius);
		repaintStar();
		return this;
	}
	
	private void repaintStar() {
		starPanel.setPoints(starModel.getPoints());
		starPanel.repaint();
	}

	
}
