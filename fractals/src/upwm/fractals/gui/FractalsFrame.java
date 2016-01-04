package upwm.fractals.gui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JColorChooser;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import upwm.fractals.FractalSet;
import upwm.fractals.Julia;
import upwm.fractals.Mandelbrot;

@SuppressWarnings("serial")
public class FractalsFrame extends JFrame {
	private CanvasPane canvasPanel = new CanvasPane();

	private JPanel contentPanel = new JPanel();
	private JPanel buttonsPanel = new JPanel();

	private JComboBox<FractalSet> chooseSet = new JComboBox<FractalSet>(
			new FractalSet[] { new Mandelbrot(), new Julia() });

	private JColorChooser gradientStartChooser = new JColorChooser(Color.BLACK);
	private JColorChooser gradientEndChooser = new JColorChooser(Color.WHITE);

	private JSpinner spinner = new JSpinner(new SpinnerNumberModel(50, 1, 500, 1));

	public FractalsFrame() {
		initGUI();
	}

	private void initGUI() {
		contentPanel.setLayout(new BorderLayout());
		contentPanel.add(canvasPanel, BorderLayout.CENTER);
		contentPanel.add(buttonsPanel, BorderLayout.PAGE_END);
		buttonsPanel.add(chooseSet);
		buttonsPanel.add(spinner);
		buttonsPanel.add(gradientStartChooser);
		buttonsPanel.add(gradientEndChooser);
		canvasPanel.setPreferredSize(new Dimension(1700, 900));
		setContentPane(contentPanel);
		pack();

		FractalSet set = new Mandelbrot();
		FractalSetController ctrlr = new FractalSetController(canvasPanel, set);
		ctrlr.paintGraph();

		canvasPanel.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (e.getButton() == MouseEvent.BUTTON1) {
					ctrlr.zoomIn(e.getX(), e.getY());
				} else {
					ctrlr.zoomOut(e.getX(), e.getY());
				}
			}
		});

		chooseSet.addActionListener(e -> {
			int index = chooseSet.getSelectedIndex();
			FractalSet s = chooseSet.getModel().getElementAt(index);
			ctrlr.setSet(s);
		});
		spinner.addChangeListener(e -> ctrlr.setIterations(((Number) spinner.getValue()).intValue()));
		gradientStartChooser.getSelectionModel()
				.addChangeListener(e -> ctrlr.setGradientStart(gradientStartChooser.getColor()));
		gradientEndChooser.getSelectionModel()
				.addChangeListener(e -> ctrlr.setGradientEnd(gradientEndChooser.getColor()));
		setDefaultCloseOperation(EXIT_ON_CLOSE);

	}

	public static void main(String[] args) {
		FractalsFrame ff = new FractalsFrame();
		ff.setVisible(true);
	}
}
